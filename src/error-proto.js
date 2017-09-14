//@flow

const noFallback = (function featureDetect() {
  try {
    return typeof Error.captureStackTrace === 'function'
  } catch (error) {
    return false
  }
})()


/*::
const callAssign = {
  call(thisFn: any, arg: string){

  }
}

class ExtendableErrorClass extends Error {}
*/

function ErrorFunction(message: string) {
  const Err = /*::Object.assign({}, callAssign, */Error/*::)*/
  Err.call(this, message)
  if (noFallback) {
    Error.captureStackTrace(this, ErrorFunction)
  } else {
    this.stack = (new Error()).stack
  }
  this.name = this.constructor.name
  this.message = message
}



ErrorFunction.prototype = Object.create(Error.prototype)
ErrorFunction.prototype.constructor = ErrorFunction

const ExtendableError: Class<ExtendableErrorClass> = (ErrorFunction: any)

export default ExtendableError
