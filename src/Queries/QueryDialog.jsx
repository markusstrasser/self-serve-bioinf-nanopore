import React from 'react'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { queryParser } from '../utils'

const QueryDialog = (props = { query: { fn1: "", params: [] } }) => {
    const { fn1, fn2, var1, var2 } = props.query;
    return (
        <React.Fragment>
            <Form >
                <div>
                    <Field name='fn1' /* defaultValue={fn1} */ placeholder={'fn1'} />
                    <Field name='fn2' /* defaultValue={fn2} */ placeholder={'fn2'} />
                    <Field name='var1' /* defaultValue={var1} */ placeholder={'var1'} />
                    <Field name='var2' /* defaultValue={var2} */ placeholder={'var2'} />
                    {/* {errors && <p>{errors}</p>} */}
                    {/* {errors.api && <p>{`Error  : ${errors}`}</p>} */}
                    <button type='submit' title='save' >Submit</button>
                </div>
            </Form>
        </React.Fragment>
    )
}

const QueryDialogMeta = withFormik({
    mapPropsToValues: (props) => ({
        ...props.query
    }),
    validationSchema: Yup.object().shape({
        fn1: Yup.string(),
        fn2: Yup.string(),
        var1: Yup.string(),
        var2: Yup.string(),
    }),
    handleSubmit({ fn1, fn2, var1, var2 } /* form values */, bag,/* formikExtras */) {
        // console.log(fn1, fn2, var1, var2, 'values formik', 'parsed', queryParser(fn1, fn2, var1, var2));
        const parsed = queryParser(fn1, fn2, var1, var2);
        // console.log(bag, 'bag', parsed, 'reverse', reverseQueryParse(parsed))
        //formik weirdness
        bag.props.update(parsed)
    }
})

export default QueryDialogMeta(QueryDialog)
