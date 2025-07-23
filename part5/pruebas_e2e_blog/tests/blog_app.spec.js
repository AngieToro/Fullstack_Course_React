const { test, describe, expect, beforeEach } = require ('@playwright/test')
const { loginData } = require('./helper')
const { createBlog } = require('./helper')

 describe('Blog App Tests', () => {

    describe('Login', () => {

        beforeEach(async ({ page, request }) => {
   
            await page.goto('/')
        })

         test('Logint form is show', async ({ page }) => {

            await page.getByRole('button', { name: 'Login' }).click()
        })

        test('login form can be opened with correct data', async ({ page }) => {
            
            await loginData(page, 'angie','12345')

            const element = page.getByText('Welcome Angelica')
            await expect(element).toBeVisible()
        })

        test('login fails with wrong password', async ({ page }) => {
            
            await loginData(page, 'angie','1234')

            const errorDiv = await page.locator('.messageError')
            await expect(errorDiv).toContainText('Wrong credentials')
            await expect(errorDiv).toHaveCSS('border-style', 'solid')
            await expect(errorDiv).toHaveCSS('color','rgb(255, 0, 0)')
            
            const element = page.getByText('Welcome Angelica')
            await expect(element).not.toBeVisible()
        })
    
    })

    describe('Blog Add', () => {

        beforeEach(async ({ page }) => {

            await loginData(page, 'angie','12345')
        })

        test('a new blog can be created', async ({ page }) => {
           
            const newBlog = {
                title: 'Test with Playwright',
                author: 'Angelica',
                url: 'https://localhost.com/',
                likes: 1
            }

            await createBlog(page, newBlog)
            
            const element = page.getByText('A new blog Test with Playwright by Angelica added')
            await expect(element).toBeVisible()
        })
    })

    describe('Blog Change', () => {

        beforeEach(async ({ page }) => {
            
            await loginData(page, 'angie','12345')
        })

          test('likes can be changed', async ({ page }) => {

            const blogElement = await page.getByText('Test with Playwright by Angelica')

            await blogElement.getByRole('button', { name: 'View' }).click()

            const likeElement = await page.locator('.likes')

            const likesText = await likeElement.textContent()
            const initialLikes = parseInt(likesText.match(/\d+/)[0])

            await page.getByRole('button', { name: 'Like' }).click()

            const updatedLikesText = await likeElement.textContent()
            const updatedLikes = parseInt(updatedLikesText.match(/\d+/)[0])

            await expect(updatedLikes).toBeGreaterThanOrEqual(initialLikes)
            
            const likesUpdated = page.getByText('The blog Test with Playwright has received a like') 
            await expect(likesUpdated).toBeVisible()
            
        })

    })

    describe('Blog Delete', () => {

        beforeEach(async ({ page }) => {
            
            await loginData(page, 'angie','12345')
        })

        test('only creator can see and use the Delete button', async ({ page }) => {

            const blogElement = await page.getByText('Prueba by Angelica Toro')

            await blogElement.getByRole('button', { name: 'View' }).click()

            const deleteButton = await page.getByRole('button', { name: 'Delete' })
            await expect(deleteButton).toBeVisible()

            await page.getByRole('button', { name: 'Logout' }).click()

            await loginData(page, 'user','12345')

            const blogElementOther = await page.getByText('Prueba by Angelica Toro')

            await blogElementOther.getByRole('button', { name: 'View' }).click()

            const deleteButtonOther = await page.getByRole('button', { name: 'Delete' })
            await expect(deleteButtonOther).not.toBeVisible()

        })

        test('creator can Delete the blog', async ({ page }) => {

             const blogElement = await page.getByText('Prueba by Angelica Toro')

            await blogElement.getByRole('button', { name: 'View' }).click()

            const deleteButton = await page.getByRole('button', { name: 'Delete' })
            await expect(deleteButton).toBeVisible()

            page.on('dialog', async (dialog) => {
                if (dialog.type() === 'confirm') {
                    console.log('Are you sure you want to delete this blog Prueba ?', dialog.message())
                    await dialog.accept()
                }
            })

            await deleteButton.click()

            const blogStillVisible = page.locator('text=Prueba by Angelica Toro')
            await expect(blogStillVisible).toHaveCount(0)

        })
    })

     describe('Blogs', () => {

        beforeEach(async ({ page }) => {
            
            await loginData(page, 'angie','12345')
        })

        test('blogs are ordered by likes descending', async ({ page }) => {

            const blogElements = await page.locator('.blogTitleAuthor').all()

            for (const blog of blogElements) {
                const viewButton = blog.getByRole('button', { name: 'View' })
                await viewButton.click()
            }

            const likeCounts = []

            for (const blog of blogElements) {
                const likeText = await blog.locator('.likes').textContent()
                const likeNumber = parseInt(likeText.match(/\d+/)[0])
                likeCounts.push(likeNumber)
            }
            
            const sort = [...likeCounts.sort( (a, b) =>  b - a ) ]

            expect(likeCounts).toEqual(sort)
            
        })
     })
 })
