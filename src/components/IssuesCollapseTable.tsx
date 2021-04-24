import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AddIssue from "./AddIssue";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row({row, name, owner}: any, ) {
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell align="left">{row.node.title}</TableCell>
                <TableCell align="left">{row.node.bodyText}</TableCell>
                <TableCell align="left">{row.node.comments.totalCount}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    {
                                        row.node.comments.edges.map((i: any, idx: number) => {
                                            return (
                                                <TableRow key={idx}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row">{i.node.author.login}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">{i.node.bodyText}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                    <TableRow>
                                        <AddIssue commentsId={row.node.id} name={name} owner={owner}/>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable({data}: any) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell align="left">TITLE</TableCell>
                        <TableCell align="left">BODY</TableCell>
                        <TableCell align="left">COMMENTS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.repository.issues.edges.map((i: any, idx: number) => {
                            return <Row key={idx} row={i} name={data.repository.name} owner={data.repository.owner.login}/>
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}