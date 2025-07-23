const { test, describe, expect, beforeEach } = require ('@playwright/test')
const { loginData } = require('./helper')
const { createNote } = require('./helper')

describe('Note App Tests', () => {

    describe('Login', () => {

        beforeEach(async ({ page, request }) => {
      /*      await request.post('http:localhost:3001/api/testing/reset')
            await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Angelica Toro',
                username: 'angie',
                password: '123'
            }
        })*/

            await page.goto('/')
        })

        test('front page can be opened', async ({ page }) => {
                
            const locatorTitle = page.getByText('Notes')
            await expect(locatorTitle).toBeVisible()

            const locatorFooter = page.getByText('Note app, Department of Computer Science, University of Helsinki 2025 - Angelica Practice')
            await expect(locatorFooter).toBeVisible()
        })

        test('login form can be opened', async ({ page }) => {
            
            await page.getByRole('button', { name: 'Login' }).click()
        })

        test('login form can be opened with correct data', async ({ page }) => {
            
            await loginData(page, 'angie','123')

            const element = page.getByText('Welcome Angelica Toro')
            await expect(element).toBeVisible()
        })

        test('login fails with wrong password', async ({ page }) => {
            
            await loginData(page, 'angie','123')

            //const element = page.getByText('Wrong credentials')
            //await expect(element).toBeVisible()

            const errorDiv = await page.locator('.messageError')
            await expect(errorDiv).toContainText('Wrong credentials')
            await expect(errorDiv).toHaveCSS('border-style', 'solid')
            await expect(errorDiv).toHaveCSS('color','rgb(255, 0, 0)')
            
            const element = page.getByText('Welcome Angelica Toro')
            await expect(element).not.toBeVisible()
        })
    })

    describe('Note Add', () => {

        beforeEach(async ({ page }) => {

            await loginData(page, 'angie','123')
        })

        test('a new note can be created', async ({ page }) => {
           
            await createNote(page, 'Gryffindor', true)
            
            const element = page.getByText('Note Gryffindor was added')
            await expect(element).toBeVisible()
        })
    })

    describe('Note Change', () => {

        beforeEach(async ({ page }) => {
            
            await loginData(page, 'angie','123')

            await createNote(page, 'Typescript', true)
        })

          test('importance can be changed', async ({ page }) => {

            const elementCreated = await page.getByText('Typescript')

            await elementCreated.getByRole('button', { name: 'Make important' }).click()
            
            const element = page.getByText('Make important') 
            await expect(element).toBeVisible()
        })

    })
})
