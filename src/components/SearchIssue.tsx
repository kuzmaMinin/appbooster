import React, {useState} from "react";
import {Button, Grid, Input} from "@material-ui/core";

const SearchIssue = ({loadQuery}: any) => {
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');

    function handleInput(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        const {value, id} = e.target;

        id === 'owner' && setOwner(value);
        id === 'name' && setName(value);
    }

    function handleClick() {
        loadQuery(
            {variables: {name: name, owner: owner}}
        );
        setOwner('');
        setName('');
    }

    return (
        <Grid
            container
            alignItems="center"
            spacing={3}
        >
            <Grid item xs={4}>
                <Input
                    fullWidth
                    onChange={(e) => handleInput(e)}
                    value={owner}
                    id='owner'
                    placeholder='Enter user name'
                />
            </Grid>
            <Grid item xs={4}>
                <Input
                    fullWidth
                    onChange={(e) => handleInput(e)}
                    value={name}
                    id='name'
                    placeholder='Enter repo name'
                />
            </Grid>
            <Grid item xs={4}>
                <Button
                    onClick={handleClick}
                    variant='contained' color='primary'
                >Поехали!</Button>
            </Grid>
        </Grid>
    );
}

export default SearchIssue;