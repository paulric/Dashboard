import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import { useState, useRef } from "react";

import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Switch,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import { NotificationManager } from "react-notifications";
import { useGlobalApiClient } from "../../../../core/useApiClient";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Checkbox from "@mui/material/Checkbox";
import { blue, pink } from "@mui/material/colors";
import { Balance } from "@mui/icons-material";

const emails = ["username@gmail.com", "user02@gmail.com"];

function EditUserCreditDialog(props) {
  const { onClose, selectedValue, open, userID, currentBalance } = props;
  const balance = useRef<HTMLInputElement>();
  const [isActive, setActive] = useState(true);

  const api = useGlobalApiClient();

  const handleActivate = () => {
    setActive(!isActive);
  };

  const handlePass = () => {
    if (!balance.current.value) {
      NotificationManager.warning(
        `Please fill out all inputs`,
        "Invalid Input"
      );
    } else {
      passEditInfo();
    }
  };
  // id: string;
  // password?: string;
  // email?: string;
  // username?: string;
  // active?: boolean;
  const passEditInfo = async () => {
    

    const { response } = await api.credit_update_credit_post({
      ownerId: userID,
      balance: balance.current.value ? Number(balance.current.value) : 0,
    });
    if (!response) {
      NotificationManager.error(
        `Please input correct user id`,
        "User does not exist"
      );
    } else {
      NotificationManager.success(`The User Information Updated`, "Success");
    }
    handleClose();
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          fontSize: "25px",
          fontWeight: "bold",
          color: "white",
          pt: "3rem",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "bold",
            textShadow: "1px 1px 10px #8c7cf0",
          }}
        >
          Adjust Credit
        </Typography>
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem sx={{ justifyContent: "space-between" }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography>Balance</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                size="small"
                sx={{ width: "100%" }}
                defaultValue={currentBalance}
                inputRef={balance}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem sx={{ justifyContent: "center", marginTop:'15px' }}>
          <Button
            sx={{ marginRight: "70px" }}
            variant="contained"
            onClick={handlePass}
          >
            Confirm
          </Button>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
}

EditUserCreditDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userID: PropTypes.string,
  currentBalance: PropTypes.number
  // selectedValue: PropTypes.string.isRequired
};

export function EditUserCredit(props: { userID: string, balance: number }) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#2e7d32" }}
        disableRipple
        startIcon={<ImportExportIcon />}
        onClick={handleClickOpen}
      >
        <Typography noWrap>Adjust Credit</Typography>
      </Button>
      <EditUserCreditDialog
        open={open}
        onClose={handleClose}
        userID={props.userID}
        currentBalance={props.balance}
      />
    </>
  );
}

export default EditUserCreditDialog;
