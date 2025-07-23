const loginData = async(page, username, password) => {

    //await page.goto('http://localhost:5173')
    await page.goto('/')

    await page.getByRole('button', { name: 'Login' }).click()
                
    await page.getByTitle('username').fill(username)
    await page.getByTitle('password').fill(password)
                
    await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async(page, blog) => {

    await page.getByRole('button', { name: 'New blog' }).click()

    await page.getByTitle('title').fill(blog.title)
    await page.getByTitle('author').fill(blog.author)
    await page.getByTitle('url').fill(blog.url)        

    await page.getByRole('button', { name: 'Create' }).click()
}

export { 
    loginData,
    createBlog 
}