import { Form, useActionData, useNavigate, useNavigation  } from "react-router";

export function LoginForm() {
    const navigate = useNavigate();
    const actionData = useActionData<{ error?: string }>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const handleRedirect = () => { navigate("/register") }

    return (
        <div>
            <Form method="post">
            {actionData?.error && <p>{actionData.error}</p>}
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
            </button>
        </Form>
        <button type="button" onClick={handleRedirect}>Register!</button>
        </div>
    );
}