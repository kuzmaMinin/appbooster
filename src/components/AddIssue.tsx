import React, {useState} from 'react';
import {Button, Input, makeStyles} from "@material-ui/core";
import gql from "graphql-tag";
import {useMutation} from "react-apollo";
import TableCell from "@material-ui/core/TableCell";
import {ISSUES_QUERY} from './Issues';

export const POST_ISSUE = gql`
    mutation postIssue($id: String, $message: String) {
    addComment(input:{
        subjectId: $id,
        body: $message
    }) {
        clientMutationId
    }
}
`;

const style = makeStyles({
    border: {
        border: 'none',
        paddingTop: '20px'
    }
});

const AddIssue = ({commentsId, name, owner}: any) => {
    const [message, setMessage] = useState('');


    const [postIssue] = useMutation(POST_ISSUE, {
        refetchQueries: () => [
            {
                query: ISSUES_QUERY,
                variables: {owner: owner, name: name},
            }
        ],
    });
    const classes = style();

    function handleInputData(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        const {value} = e.target;
        setMessage(value);
    }


    async function handlePostData() {
        await postIssue({
            variables: {message: message, id: commentsId},
        });
        setMessage('');
    }

    return (
        <>
            <TableCell className={classes.border}>
                <Button
                    onClick={handlePostData}
                    color='primary'
                    variant='contained'
                >Добавить</Button>
            </TableCell>
            <TableCell className={classes.border}>
                <Input
                    fullWidth
                    value={message}
                    onChange={(e) => handleInputData(e)}
                    placeholder='Введите текст комментария'
                />
            </TableCell>
        </>
    );
}

export default AddIssue;