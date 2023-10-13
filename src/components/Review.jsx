import React from "react";
import { Grid, Typography, Link } from "@mui/material";
import { useSelector } from "react-redux";

const Review = () => {
  const { employee, address, employer, bank, loan, application } = useSelector(
    (state) => state
  );

  const { attachmentName } = useSelector((state) => state.application);

  const formatDate = (dateString) => {
    // const dob = employee.dob.$d;

    let strLen;
    if (typeof dateString === "object") {
      // convert date obj to string
      const objStr = JSON.stringify(dateString);
      strLen = objStr.split("");
    } else {
      strLen = dateString ? dateString.split("") : [];
    }

    if (strLen.length > 10) {
      console.log("--- object ---");
      let objStrDate = JSON.stringify(dateString);
      const date = new Date(objStrDate);
      console.log(objStrDate);
      const formatedDate = date.toLocaleDateString("us-PT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      console.log(JSON.stringify(dateString));
      return formatedDate;
    } else {
      return dateString;
    }
  };

  //dob
  const dob = formatDate(employee.dob.$d ? employee.dob.$d : employee?.dob);

  const dateOfEmployment = formatDate(employer.employmentDate);
  console.log(employee.dob.$d);

  return (
    <>
      <div style={{ padding: "0 2rem" }}>
        <Typography variant="h6" gutterBottom align="center">
          Application summary
        </Typography>
        <Grid container spacing={2}>
          <Grid item container direction="column" xs={12}>
            <Typography component="h2" variant="subtitle1" gutterBottom>
              Personal details & contact information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={2} style={{ color: "#6d6d6dda" }}>
                <Typography gutterBottom>Name</Typography>
                <Typography gutterBottom>Gender</Typography>
                <Typography gutterBottom>Date of Birth</Typography>
                <Typography gutterBottom>Marital Status</Typography>
                <Typography gutterBottom>Dependents</Typography>
              </Grid>
              <Grid item xs={3}>
                <div>
                  <Typography gutterBottom>
                    {employee.firstName ? employee.firstName : "--"}{" "}
                    {employee.lastName ? employee.lastName : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    {employee.gender ? employee.gender : "--"}
                  </Typography>
                  <Typography gutterBottom>{dob ? dob : "--"}</Typography>
                  <Typography gutterBottom>
                    {employee.maritalStatus ? employee.maritalStatus : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    {employee.dependents ? employee.dependents : "--"}
                  </Typography>
                </div>
              </Grid>

              <Grid item xs={2} style={{ color: "#6d6d6dda" }}>
                <Typography gutterBottom>Lot Number</Typography>
                <Typography gutterBottom>Section</Typography>
                <Typography gutterBottom>Surburb</Typography>
                <Typography gutterBottom>Street</Typography>
                <Typography gutterBottom>City</Typography>
                <Typography gutterBottom>Province</Typography>
                <Typography gutterBottom>District</Typography>
                <Typography gutterBottom>Village</Typography>
                <Typography gutterBottom>Settlement</Typography>
                <Typography gutterBottom>Apartment</Typography>
                <Typography gutterBottom>Unit Number</Typography>
                <Typography gutterBottom>Contact Numbers</Typography>
                <Typography gutterBottom>Email Address</Typography>
                <Typography gutterBottom>Address</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography gutterBottom>
                  {address.lot ? address.lot : "--"}
                </Typography>
                <Typography gutterBottom>
                  {address.section ? address.section : "--"}
                </Typography>
                <Typography gutterBottom>
                  {address.suburb ? address.suburb : "--"}
                </Typography>
                <Typography gutterBottom>
                  {address.street ? address.street : "--"}
                </Typography>
                <Typography gutterBottom>
                  {address.city ? address.city : "--"}
                </Typography>
                <Typography gutterBottom>
                  {address.province ? address.province : "--"}
                </Typography>
                <Typography gutterBottom>
                  {address.district ? address?.district : "--"}
                </Typography>
                <Typography gutterBottom>
                  {address.village ? address?.village : "--"}
                </Typography>
                <Typography gutterBottom>
                  {address.settlement ? address?.settlement : "--"}
                </Typography>
                <Typography gutterBottom>
                  {address.apartmentName ? address?.apartmentName : "--"}
                </Typography>
                <Typography gutterBottom>
                  {address.unitNo ? address?.unitNo : "--"}
                </Typography>
                <Typography gutterBottom>
                  {address.mobileNumber ? address.mobileNumber : "--"},
                  {address.phoneNumber ? address.phoneNumber : "--"}
                </Typography>
                <Typography gutterBottom>
                  {address.email ? address.email : "--"}
                </Typography>
                <Typography gutterBottom>
                  {address.postalAddress ? address.postalAddress : "--"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container direction="column" xs={8} sm={4}>
            <Typography
              component="h2"
              variant="subtitle1"
              gutterBottom
              sx={{ mt: 2 }}
            >
              Employer details
            </Typography>
            <Grid container>
              <Grid item xs={6} style={{ color: "#6d6d6dda" }}>
                <Typography gutterBottom>Employer</Typography>
                <Typography gutterBottom>Staff ID</Typography>
                <Typography gutterBottom>Employment Date</Typography>
                <Typography gutterBottom>Position</Typography>
                <Typography gutterBottom>Department</Typography>
                <Typography gutterBottom>Payroll Officer</Typography>
                <Typography gutterBottom>Contact Numbers</Typography>
                <Typography gutterBottom>Email</Typography>
                <Typography gutterBottom>Attachments</Typography>
                <Typography gutterBottom>Address</Typography>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <Typography gutterBottom>
                    {employer.employer ? employer.employer : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    {employer.staffId ? employer.staffId : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    {dateOfEmployment ? dateOfEmployment : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    {employer.position ? employer.position : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    {employer.department ? employer.department : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    {employer.payOfficer ? employer.payOfficer : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    {employer.workPhoneNumber ? employer.workPhoneNumber : "--"}
                    ,
                    {employer.workMobileNumber
                      ? employer.workMobileNumber
                      : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    {employer.workEmail ? employer.workEmail : "--"}
                  </Typography>
                  <Typography gutterBottom>{attachmentName}</Typography>
                  <Typography gutterBottom>
                    {employer.employerAddress ? employer.employerAddress : "--"}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={8} sm={4}>
            <Typography
              component="h2"
              variant="subtitle1"
              gutterBottom
              sx={{ mt: 2 }}
            >
              Loan details
            </Typography>
            <Grid container>
              <Grid item xs={6} style={{ color: "#6d6d6dda" }}>
                <Typography gutterBottom>Invoice Number</Typography>
                <Typography gutterBottom>Application Type</Typography>
                <Typography gutterBottom>Amount Applied</Typography>
                <Typography gutterBottom>Repayment Amount</Typography>
                <Typography gutterBottom>Installment Amount</Typography>
                <Typography gutterBottom>Loan Term</Typography>
                <Typography gutterBottom>Purpose</Typography>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <Typography gutterBottom>
                    {loan.invoice ? loan.invoice : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    {application?.appType === "1"
                      ? "Customer Loan"
                      : application?.appType === "2"
                      ? "Staff Loan"
                      : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    PGK {loan.loanAmount ? loan.loanAmount : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    PGK {loan.totalRepayment ? loan.totalRepayment : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    PGK{" "}
                    {loan.repaymentAmount
                      ? loan.repaymentAmount.toFixed(2)
                      : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    {loan.repaymentTerm ? loan.repaymentTerm : "--"}{" "}
                    Fortnight(s)
                  </Typography>
                  <Typography gutterBottom>
                    {loan.loanPurpose ? loan.loanPurpose : "--"}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={8} sm={4}>
            <Typography
              component="h2"
              variant="subtitle1"
              gutterBottom
              sx={{ mt: 2 }}
            >
              Bank details
            </Typography>
            <Grid container>
              <Grid item xs={6} style={{ color: "#6d6d6dda" }}>
                <Typography gutterBottom>Bank</Typography>
                <Typography gutterBottom>Account Name</Typography>
                <Typography gutterBottom>Account Number</Typography>
                <Typography gutterBottom>Account Type</Typography>
                <Typography gutterBottom>Branch</Typography>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <Typography gutterBottom>
                    {bank.bank ? bank.bank : "--"}
                  </Typography>

                  <Typography gutterBottom>
                    {bank.accountName ? bank.accountName : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    {bank.accountNumber ? bank.accountNumber : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    {bank.accountType ? bank.accountType : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    {bank.branch ? bank.branch : "--"}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Review;
