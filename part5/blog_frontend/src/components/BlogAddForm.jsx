const BlogAddForm = ( {
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  url,
  handleUrlChange,
  handleAddBlogSubmit
}) => (

  <div>
    <h2>Create a Blog</h2>
    <form onSubmit={ handleAddBlogSubmit }>
      <div>
        Title
        <input
          title="title"
          value={ title }
          onChange={ handleTitleChange }
          placeholder="Write a Title here"
        />
      </div>
      <div>
        Author
        <input
          title="author"
          value={ author }
          onChange={ handleAuthorChange }
          placeholder="Write a Author here"
        />
      </div>
      <div>
        URL
        <input
          title="url"
          value={ url }
          onChange={ handleUrlChange }
          placeholder="Write URL here"
        />
      </div>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  </div>

)

export default BlogAddForm