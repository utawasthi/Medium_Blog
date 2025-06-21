import { Quote } from "../components/Quote"
import { SignupAuth } from "../components/SignupAuth"

const Signup = () => {

  return (
    <div className = 'grid grid-cols-1 lg:grid-cols-2'>
      <div>
        <SignupAuth />
      </div>
        <Quote/>
    </div>
 )
}

export default Signup