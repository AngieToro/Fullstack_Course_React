const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    
  if (blogs.length === 0)
    return null

  const favorite = blogs.reduce((previous, current) => {
    return current.likes > previous.likes
      ? current
      : previous
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}