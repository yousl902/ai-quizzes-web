const customColors = require("./configs/colors.json");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: customColors.background,
        navbar: customColors.navbar,
        footer: customColors.footer,
        alt: customColors.quizAlternative,
        progress: customColors.progressBar,
        quizMenuHeader: customColors.quizMenuHeader,
        infoHeader: customColors.infoPageHeader,
        infoSubheader: customColors.infoPageSubheaders,
        icons: customColors.icons,
        email: customColors.email,
        emailHover: customColors.emailHover,
        loadingSpinner: customColors.loadingSpinner,
        quizHover: customColors.quizHover,
        infoSections: customColors.infoSections,

        btnStart: customColors.buttons.start.background,
        btnStartCircle: customColors.buttons.start.circle,
        btnStartHover: customColors.buttons.start.circleHover,
        btnProfile: customColors.buttons.profile.background,
        btnProfileCircle: customColors.buttons.profile.circle,
        btnProfileHover: customColors.buttons.profile.circleHover,
        btnLoginNavbar: customColors.buttons.loginNavbar,
        btnLoginForm: customColors.buttons.loginForm,
        btnCreateAccount: customColors.buttons.createAccount,
        btnLogout: customColors.buttons.logout,
        btnNext: customColors.buttons.next.background,
        btnNextHover: customColors.buttons.next.hover,
        btnPrev: customColors.buttons.prev.background,
        btnPrevHover: customColors.buttons.prev.hover,
        btnResetPassword: customColors.buttons.resetPassword,
        btnGoHome: customColors.buttons.goHome.background,
        btnGoHomeHover: customColors.buttons.goHome.hover,
        btnTryAgain: customColors.buttons.tryAgain.background,
        btnTryAgainHover: customColors.buttons.tryAgain.hover,

        chartLow: customColors.chart.low,
        chartHigh: customColors.chart.high,
        chartAverage: customColors.chart.average,
      },
    },
  },
};
