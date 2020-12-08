import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const FiltersFormControlLabel = withStyles({
  label: {
    fontSize: 14,
  },
})(FormControlLabel);

export default FiltersFormControlLabel;
