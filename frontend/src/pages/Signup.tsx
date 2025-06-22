import { Quote } from "../components/Quote"
import { SignupAuth } from "../components/SignupAuth"

const Signup = () => {

  return (
    <div className = 'grid grid-cols-1 lg:grid-cols-2'>
      <div>
        <SignupAuth />
      </div>
      <div className = 'hidden lg:block'>
        <Quote/>
      </div>
    </div>
 )
}

export default Signup