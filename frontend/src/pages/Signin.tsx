import { Quote } from "../components/Quote"
import { SigninAuth } from "../components/SigninAuth"

const Signup = () => {
  return (
    <div className = 'grid grid-cols-1 lg:grid-cols-2'>
      <div>
        <SigninAuth/>
      </div>
        <Quote/>
    </div>
 )
}

export default Signup