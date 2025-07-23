const loginData = async(page, username, password) => {

    //await page.goto('http://localhost:5173')
    await page.goto('/')

    await page.getByRole('button', { name: 'Login' }).click()
                
    await page.getByTitle('username').fill(username)
    await page.getByTitle('password').fill(password)
                
    await page.getByRole('button', { name: 'Login' }).click()
}

const createNote = async(page, content) => {

    await page.getByRole('button', { name: 'Create Note' }).click()

    //textbox ya que es un solo input (content)
    await page.getByRole('textbox').fill(content)
            
    await page.getByRole('button', { name: 'Save' }).click()
}

export { 
    loginData,
    createNote 
}