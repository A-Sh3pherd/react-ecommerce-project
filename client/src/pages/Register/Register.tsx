import {ReactNode, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Col, Container, Row} from "react-bootstrap";
import RegisterStepOne from "./RegisterStepOne";
import {useHistory} from "react-router-dom";
import Auth from "../../Auth/Auth";
import RegisterStepTwo from "./RegisterStepTwo";
import axios from "axios";
import {StyledRegisterForm, StyledSpan} from "./styles/StyledRegisterForm";

// @ts-ignore
import Logo from "./iPay Register.png";
import ErrorModal from "../../components/Modals/ErrorModal";
import MessageModal from "../../components/Modals/MessageModal";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
        button: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    })
);

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const history = useHistory();
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    const steps = getSteps();

    // Getting the steps
    function getSteps() {
        return ["Enter email and password", "Shipping info"];
    }

    // Fetching content from each step
    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return (
                    <RegisterStepOne
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setSecondPassword={setSecondPassword}
                    />
                );
            case 1:
                return (
                    <RegisterStepTwo
                        setCity={setCity}
                        setStreet={setStreet}
                        setLname={setLname}
                        setFname={setFname}
                    />
                );
            default:
                return "Unknown step";
        }
    }

    // If step is required
    const isStepOptional = (step: number) => {
        return step === 1;
    };

    // If user tried to skip steps
    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    // Next step Handler
    const handleNext = async () => {
        // Email validations
        if (!Auth.validateEmail(email)) return;
        const available = await checkIfEmailAvailable();
        if (!available) return;
        // Password validation
        if (password !== secondPassword) return alert("Password must match!");
        //
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    // Go back stepper handler
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // Reset stepper handler
    const handleReset = () => {
        setActiveStep(0);
    };

    // Checking email availability
    async function checkIfEmailAvailable(): Promise<Boolean> {
        const {data} = await axios.get(`http://localhost:3005/register`, {
            params: {email},
        });
        if (data.status === "Fuck") {
            alert("Sorry, email is taken");
            return false;
        } else if (!data.message) {
            alert("Something went wrong.");
        } else {
            return true;
        }
    }

    // Registration function With validations
    async function register() {
        // Name Validations
        if (fname.length ! < 3) return ErrorModal("First Name is invalid");
        if (lname.length ! < 3) return ErrorModal("Last Name is invalid.");
        // City & Street validations
        if (!city) return ErrorModal("You must select a city from the list!");
        if (street.length ! < 3) return ErrorModal("Street must be at least 3 Letters!")
        // Register
        console.log(city)
        const {data} = await axios.post("http://localhost:3005/register", {
            fname,
            lname,
            email,
            password,
            city,
            street,
        });
        if (!data.user) return ErrorModal(data.message);
        // Creating new user in the local storage
        localStorage.setItem('newUser', fname);
        MessageModal("User was successfully created!", 'Cool ! ');
        history.push("/login");
    }

    return (
        <div className={classes.root}>
            <Container>
                {/*  Stepper  */}
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: { optional?: ReactNode } = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Container>
            <Row>
                {/*  Logo  */}
                <Col className='d-flex justify-content-center'>
                    <img src={Logo} alt="Reg-Logo"/>
                </Col>
            </Row>

            <StyledRegisterForm>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            {/*  Reset Button  */}
                            <Button onClick={handleReset} className={classes.button}>
                                Reset
                            </Button>
                        </div>
                    ) : (
                        <div>
                            {/*   Getting the steps  */}
                            <Typography className={classes.instructions}>
                                {getStepContent(activeStep)}
                            </Typography>
                            <div>
                                {/*  Back Button  */}
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.button}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={activeStep !== 1 ? handleNext : register}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? "Register" : "Next"}
                                </Button>
                                <StyledSpan>
                                      <span onClick={() => history.push("/login")}>
                                        Already have an account?
                                      </span>
                                </StyledSpan>
                            </div>
                        </div>
                    )}
                </div>
            </StyledRegisterForm>
        </div>
    );
}

export default Register;
