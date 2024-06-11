import {EyeClosed, EyeSolid} from "iconoir-react";
import {MouseEventHandler} from "react";

type Props = {
	passwordType: "password" | "text";
	toggleShowPassword: MouseEventHandler;
}

const PasswordIcon = ({passwordType, toggleShowPassword}: Props) => {

	return (
		<>
			{
				passwordType === "password" &&
				<EyeClosed width={24} className="password-icon cursor-pointer" onClick={toggleShowPassword}/>
			}
			{
				passwordType === "text" &&
				<EyeSolid width={24} className="password-icon" onClick={toggleShowPassword} />
			}
		</>
	);

}

export default PasswordIcon;