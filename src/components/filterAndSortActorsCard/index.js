import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 900,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    formControl: {
        float:"left",
        marginRight :50,
        marginBottom:30,
        padding: 10,
        margin: theme.spacing(1),
        width:400,
        height:40,
        backgroundColor: "rgb(255, 255, 255)",
    },
}));

export default function FilterAndSortActorsCard(props) {
    const classes = useStyles();

    // const handleTextChange = (e, props) => {
    //     handleChange(e, "name", e.target.value);
    // };

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h1" color="white">
                    Search an actor or sort them!
                </Typography>
                {/* <TextField
                    className={classes.formControl}
                    id="filled-search"
                    label="Search field"
                    type="search"
                    value={props.titleFilter}
                    variant="filled"
                    onChange={handleTextChange}
                /> */}
                <TextField
                    className={classes.formControl}
                    id="filled-search"
                    label="Search actors"
                    type="search"
                    value={props.titleFilter}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                />
                <FormGroup className={classes.formControl}>
                    <FormControlLabel control={<Switch defaultChecked />} label="Sorted by popularity" />
                </FormGroup>
            </CardContent>
        </Card>
    );
}