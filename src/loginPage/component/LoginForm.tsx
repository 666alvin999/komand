import {MouseEventHandler, useState} from "react";
import {PasswordIcon} from "./index.ts";
import {SystemRestart} from "iconoir-react";
import {toast, Toaster} from "sonner";
import {useForm} from "@tanstack/react-form";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {

	const navigate = useNavigate();

	const [passwordType, setPasswordType] = useState<"password" | "text">("password");

	const loginForm = useForm({
		defaultValues: {
			tableNumber: "",
			tablePassword: "",
			hobbies: []
		},
		onSubmit: async () => {
			try {
				const data = {
					ok: true,
					status: 200
				};
				console.log(data);
				if (data.ok) {
					navigate("/menu");
				}
				if (!data.ok) {
					toast.error(data.status + ": Quelque chose s'est mal passé");
					return '';
				}
			} catch (error) {
				console.log("error");
				toast.error(`${error}`);
			}
		}
	})

	const toggleShowPassword: MouseEventHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if (passwordType === "password") {
			setPasswordType("text");
		} else {
			setPasswordType("password");
		}
	}

	return (
		<>
			<Toaster position={window.innerWidth < 400 ? "top-right" : "bottom-right"} richColors closeButton />
			<div id="login-form-container">
				<h1 className="font-bold">KOMAND</h1>

				<form className="w-full" onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					loginForm.handleSubmit()
				}}
				>
					<fieldset>
						<div>
							<label htmlFor="tableNumber">
								Numéro de la table
								<loginForm.Field
									name="tableNumber"
									validators={{
										onBlur: ({value}) => {
											if (!(value && value !== "")) {
												toast.warning('Veuillez renseigner un numéro de table');
												return 'Veuillez renseigner un numéro de table';
											}
											return undefined;
										}
									}}
									children={(field) => (
										<>
											<input
												type="text"
												id="table-number"
												className="login-input input-grow"
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
										</>
									)}
								/>
							</label>
						</div>

						<div>
							<label htmlFor="tablePassword">
								Mot de passe de la table
								<loginForm.Field
									name="tablePassword"
									validators={{
										onBlur: ({value}) => {
											if (!(value && value !== "")) {
												toast.warning('Veuillez rentrer le mot de passe de la table');
												return 'Veuillez rentrer le mot de passe de la table';
											}
											return undefined;
										}
									}}
									children={(field) => (
										<input
											type={passwordType}
											id="table-password"
											className="login-input input-grow"
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
									)}
								/>
							</label>
							<PasswordIcon passwordType={passwordType} toggleShowPassword={toggleShowPassword} />
						</div>

						<loginForm.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<button type="submit" className="submit-button button-grow" aria-disabled={!canSubmit} disabled={!canSubmit}>
									{
										isSubmitting &&
										<SystemRestart className="animate-spin" />
									}
									Connexion
								</button>
							)}
						/>
					</fieldset>
				</form>
			</div>
		</>
	);

}

export default LoginForm