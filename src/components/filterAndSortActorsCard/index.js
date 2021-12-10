import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import img from '../../images/actor-profile-placeholder.png'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    formControl: {
        padding:5,
        paddingTop:15,
        margin: theme.spacing(1),
        width:"90%",
        height:45,
        backgroundColor: "rgb(255, 193, 193 ,0.5)",
    },
    media: { 
        marginTop:20,
        height: 210 ,
        width:"100%",
    },
}));

export default function FilterAndSortActorsCard(props) {
    const classes = useStyles();

    const handleChange = (e, type, value) => {
        e.preventDefault();
        props.onUserInput(type, value); // NEW
        props.onSwitchChange(type);
    };
    const handleTextChange = (e, props) => {
        handleChange(e, "name", e.target.value);
    };
    const handleSwitchChange = (e, props) => {
        handleChange(e, "popularity");
    };
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h6" component="h6">
                    Search an actor or sort them according to popularity!
                </Typography>
                <TextField
                    className={classes.formControl}
                    id="filled-search"
                    label="Search actors"
                    type="search"
                    value={props.titleFilter}
                    variant="standard"
                    onChange={handleTextChange}
                />
                {/* <TextField
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
                /> */}
                <FormGroup className={classes.formControl}>
                    <FormControlLabel control={<Switch defaultChecked onChange={handleSwitchChange}/>} label="Sorted by popularity" />
                </FormGroup>
                <CardMedia
                    className={classes.media}
                    image={img}
                    title="Filter"
                />
            </CardContent>
        </Card>
    );
}