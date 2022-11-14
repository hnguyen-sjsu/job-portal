import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function MembershipPricingView(props) {
    const options = [
        {
            title: "Monthly",
            price: "49.99",
            unit: "USD/month",
            desc: "Free for 30 days",
        },
        { title: "Quarterly", price: "129.99", unit: "USD/3 months", desc: "" },
        {
            title: "Semi-Annual",
            price: "249.99",
            unit: "USD/6 months",
            desc: "",
        },
        { title: "Yearly", price: "399.99", unit: "USD/12 months", desc: "" },
    ];
    return (
        <>
            <Typography variant="h4" fontWeight="bold">
                Pricing
            </Typography>
            <Grid container spacing={2}>
                {options.map((option) => (
                    <Grid item xs={12} sm={6} md={3} key={option.title}>
                        <PricingItem
                            title={option.title}
                            price={option.price}
                            unit={option.unit}
                            desc={option.desc}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

function PricingItem(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const { title, price, unit, desc } = props;

    return (
        <Card variant="outlined">
            <CardContent>
                <Stack
                    spacing={2}
                    justifyContent="space-between"
                    style={{ minHeight: !fullScreen && "200px" }}
                >
                    <div>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            color="primary"
                        >
                            {title}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="h6" fontWeight="bold">
                                {price}
                            </Typography>
                            <Typography variant="caption">{unit}</Typography>
                        </Stack>
                        <Typography>{desc}</Typography>
                    </div>
                    <Button
                        color="primary"
                        variant="contained"
                        disableElevation
                    >
                        {title === "Monthly" ? "Try Us" : "Choose Plan"}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default MembershipPricingView;
