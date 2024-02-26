class DashboardController {
    dashboardPage = (req, res) => {
        res.status(200).render('dashboard/index.ejs', {
            title: 'Dashboard'
        });
    }
}

module.exports = new DashboardController();