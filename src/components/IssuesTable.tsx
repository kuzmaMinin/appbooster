import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const IssuesTable = ({data}: any) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table size='small' className={classes.table}>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>TITLE</StyledTableCell>
                        <StyledTableCell>COMMENT</StyledTableCell>
                        <StyledTableCell>COUNT</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {
                        data.repository.issues.edges.map((i: any, idx: number) => {
                            return (
                                <StyledTableRow key={idx}>
                                    <StyledTableCell>{i.node.title}</StyledTableCell>
                                    <StyledTableCell>{i.node.bodyText}</StyledTableCell>
                                    <StyledTableCell>{i.node.comments.totalCount}</StyledTableCell>
                                </StyledTableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default IssuesTable;