import { createSlice } from '@reduxjs/toolkit'
import BlogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs (state, action){
      return action.payload
    },
    appendBlog (state, action){
      state.push(action.payload)
    },
    clearBlogs(){
      return []
    },
    removeBlog (state, action){

      const id = action.payload

      return state.filter(blog => blog.id !== id)
    },
    changeBlog (state, action){

      const update = action.payload

      return state.map(blog => blog.id === update.id
        ? { ...update, user: blog.user }
        : blog
      )
    },
    addCommentToBlog (state, action){

      const { blogId, newComment } = action.payload

      return state.map(blog => blog.id === blogId
        ? { ... blog,
          comments: [...(blog.comments || []), newComment]
        }
        : blog
      )
    }
  }
})

export const { setBlogs, appendBlog, clearBlogs, removeBlog, changeBlog, addCommentToBlog } = blogSlice.actions

export const initialBlogs = () => {

  return async dispatch => {
    const result = await BlogService.getAll()
    console.log('Blogs:', result)
    dispatch(setBlogs(result))
  }
}

export const createBlog = ( blogObject ) => {

  return async dispatch => {
    const result = await BlogService.create(blogObject)
    console.log('Response post: ', result)
    dispatch(appendBlog(result))
  }
}

export const deleteBlog = ( id ) => {

  return async dispatch => {
    await BlogService.deleteById(id)
    dispatch(removeBlog(id))
  }
}

export const updateBlog = ( id , blog ) => {

  return async dispatch => {

    const update = {
      ...blog,
      likes: blog.likes + 1
    }

    const result = await BlogService.update(id, update)
    console.log('Response put: ', result)
    dispatch(changeBlog(result))
  }
}

export const setCommentBlog = ( comment, idBlog ) => {
  return async dispatch => {

    const result = await BlogService.blogComments( comment, idBlog )
    console.log('Response comment blogs: ', result)
    dispatch(addCommentToBlog({
      blogId: idBlog,
      newComment: result
    }))
  }
}

export default blogSlice.reducer