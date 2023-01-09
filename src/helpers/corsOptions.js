const whiteList = [
  "http://localhost:3000"
]

const corsOptions = (req, callback) => {
  let corsOptions;
  if(1) {
    corsOptions = {origin: true}
  } else {
    corsOptions = {origin: false}
  }

  callback(null, corsOptions)
}

module.exports = corsOptions