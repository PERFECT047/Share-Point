import Auth from "../components/Auth";
import Quote from "../components/Quote";


const SignUp = () => {

    

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type="signup"/>
            </div>
            <div className="none lg:block">
                <Quote />
            </div>
            
        </div>
    )
}

export default SignUp;