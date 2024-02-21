import {
  FunctionComponent,
  useState,
  useMemo,
  type CSSProperties,
} from "react";
import { Autocomplete, TextField, Icon } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import styles from "./FormInputsRowContainer.module.css";

export type FormInputsRowContainerType = {
  /** Style props */
  propBorderRadius?: CSSProperties["borderRadius"];
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propPadding?: CSSProperties["padding"];

  /** Action props */
  onSearchFlightsButtonClick?: () => void;
};

const FormInputsRowContainer: FunctionComponent<FormInputsRowContainerType> = ({
  propBorderRadius,
  propBackgroundColor,
  propPadding,
  onSearchFlightsButtonClick,
}) => {
  const [
    selectOutlinedDateTimePickerValue,
    setSelectOutlinedDateTimePickerValue,
  ] = useState(null);
  const formInputsRowStyle: CSSProperties = useMemo(() => {
    return {
      borderRadius: propBorderRadius,
      backgroundColor: propBackgroundColor,
      padding: propPadding,
    };
  }, [propBorderRadius, propBackgroundColor, propPadding]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.formInputsRow} style={formInputsRowStyle}>
        <div className={styles.inputsRow}>
          <div className={styles.inputGroup}>
            <Autocomplete
              className={styles.selectoutlined}
              size="medium"
              disablePortal
              options={[
                "Singapore (SIN)",
                "Sydney (SYD)",
                "Siem Reap (REP)",
                "Shanghai (PVG)",
                "Sanya (SYX)",
              ]}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  color="primary"
                  label="Departure"
                  variant="outlined"
                  placeholder=""
                  helperText=""
                />
              )}
              defaultValue="Singapore -  Changi (SIN)"
            />
          </div>
          <div className={styles.inputGroup}>
            <Autocomplete
              className={styles.selectoutlined}
              size="medium"
              sx={{ width: "100%" }}
              disablePortal
              options={[
                "Clark (CRK)",
                "Launceston (LST)",
                "Kalibo (KLO)",
                "Colombo CMB",
                "Melbourne (AVV)",
                "Los Angeles (LA)",
              ]}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  color="primary"
                  label="Arrival"
                  variant="outlined"
                  placeholder=""
                  helperText=""
                />
              )}
              defaultValue="Los Angeles (LA)"
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.selectoutlined}>
              <DatePicker
                label="Date"
                value={selectOutlinedDateTimePickerValue}
                onChange={(newValue: any) => {
                  setSelectOutlinedDateTimePickerValue(newValue);
                }}
                sx={{}}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    size: "medium",
                    fullWidth: true,
                    required: false,
                    autoFocus: false,
                    error: false,
                    color: "primary",
                    placeholder: "Date",
                  },
                  openPickerIcon: {
                    component: () => <></>,
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button
            className={styles.searchFlightsButton}
            onClick={onSearchFlightsButtonClick}
          >
            <div className={styles.button}>Search flights</div>
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default FormInputsRowContainer;
