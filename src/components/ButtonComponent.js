import {Button} from '@mui/material';

function ButtonComponent(props){
    return(
        <Button variant="contained" type="submit">{props.text}</Button>
    )
}

export default ButtonComponent;

