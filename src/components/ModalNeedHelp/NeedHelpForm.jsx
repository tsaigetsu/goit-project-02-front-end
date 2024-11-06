import { Formik, Form } from "formik";

import { Input, Textarea, ErrorText, StyledButton } from "./NeedHelp.styled";

const initialValues = {
  email: "",
  comment: "",
};

const NeedHelpForm = () => {
  // const dispatch = useDispatch();

  // const handleSubmit = async (values, { resetForm }) => {
  //   const { email, comment } = values;
  //   console.log({ email, comment });
  //   try {
  //     const result = await dispatch(needHelp({ email, comment }));
  //     if (needHelp.fulfilled.match(result)) {
  //       showToast("success", "Request sent successful");
  //       resetForm(initialValues);
  //       handleCloseModal();
  //     }
  //   } catch (err) {
  //     showToast("error", `Request failed. ${err.message}`);
  //   }
  // };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        // onSubmit={handleSubmit}
      >
        <Form autoComplete="off">
          <Input type="email" name="email" placeholder="Email address" />
          <ErrorText name="email" component="div" />
          <div>
            <Textarea
              component="textarea"
              name="comment"
              placeholder="Comment"
              style={{
                resize: "none",
              }}
            />
            <ErrorText name="comment" component="div" />
          </div>
          <StyledButton type="submit">Send</StyledButton>
        </Form>
      </Formik>
    </div>
  );
};

export default NeedHelpForm;
