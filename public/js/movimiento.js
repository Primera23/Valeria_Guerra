document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links li');
    const pages = document.querySelectorAll('.page-content');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            pages.forEach(page => {
                page.classList.toggle('active', page.id === targetPage);
            });
        });
    });

    const userInfoDropdown = document.getElementById('userInfoDropdown');
    const profileDropdown = document.getElementById('profileDropdown');

    userInfoDropdown.addEventListener('click', function (e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function (e) {
        if (!userInfoDropdown.contains(e.target)) {
            profileDropdown.classList.remove('show');
        }
    });

    profileDropdown.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const action = this.getAttribute('href').substring(1);
            showNotification('info', `${action.charAt(0).toUpperCase() + action.slice(1)} action triggered`);
            profileDropdown.classList.remove('show');
        });
    });

    const createChart = (selector, options) => new ApexCharts(document.querySelector(selector), options).render();

    const chartOptions = {
        chart: {
            height: 350,
            background: 'transparent',
            toolbar: { show: false },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: { enabled: true, delay: 150 },
                dynamicAnimation: { enabled: true, speed: 350 }
            }
        },
        colors: ['#4a00e0', '#8e2de2', '#00fff0'],
        fill: {
            type: 'gradient',
            gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.9, stops: [0, 90, 100] }
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3 },
        xaxis: { labels: { style: { colors: '#b3b3b3' } } },
        yaxis: { labels: { style: { colors: '#b3b3b3' } } },
        tooltip: { theme: 'dark' },
        grid: { borderColor: 'rgba(255, 255, 255, 0.1)' }
    };

    createChart("#salesChart", { ...chartOptions, series: [{ name: 'Sales', data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 200, 190] }] });
    createChart("#userGrowthChart", { ...chartOptions, series: [{ name: 'Users', data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 160, 170, 180] }] });
    createChart("#trafficSourcesChart", { ...chartOptions, chart: { type: 'pie' }, labels: ['Direct', 'Organic Search', 'Paid Search', 'Social Media', 'Referral'], series: [30, 40, 15, 10, 5] });
    createChart("#conversionRatesChart", { ...chartOptions, chart: { type: 'bar' }, series: [{ name: 'Conversion Rate', data: [2.3, 3.1, 4.0, 3.8, 5.1, 5.9, 4.5] }], xaxis: { categories: ['Landing Page', 'Product Page', 'Checkout', 'Thank You', 'Category Page', 'Search Results', 'Blog Post'] } });
    createChart("#monthlySalesChart", { ...chartOptions, series: [{ name: 'Sales', data: [110, 130, 150, 140, 160, 150, 140, 160, 170, 180, 170, 190] }] });
    createChart("#salesByCategoryChart", { ...chartOptions, chart: { type: 'donut' }, labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Toys'], series: [44, 55, 13, 33, 22] });
    createChart("#customerAcquisitionChart", { ...chartOptions, series: [{ name: 'New Customers', data: [30, 40, 45, 50, 49, 60, 70, 91, 125] }] });
    createChart("#customerSatisfactionChart", { ...chartOptions, chart: { type: 'radar' }, series: [{ name: 'Satisfaction Score', data: [80, 90, 70, 85, 75, 88] }], xaxis: { categories: ['Product Quality', 'Customer Service', 'Shipping Speed', 'User Experience', 'Price', 'Return Policy'] } });
    createChart("#stockLevelsChart", { ...chartOptions, chart: { type: 'bar' }, series: [{ name: 'Current Stock', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] }, { name: 'Reorder Level', data: [35, 41, 36, 26, 45, 48, 52, 53, 41] }], xaxis: { categories: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F', 'Product G', 'Product H', 'Product I'] } });
    createChart("#productTurnoverChart", { ...chartOptions, series: [{ name: 'Turnover Rate', data: [2.3, 3.1, 4.0, 3.8, 5.1, 5.9, 4.5, 3.9, 4.2] }], xaxis: { categories: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F', 'Product G', 'Product H', 'Product I'] } });

    
    const populateTable = (tableId, data) => {
        const tableBody = document.getElementById(tableId);
        tableBody.innerHTML = data.map(item => `<tr>${Object.values(item).map(value => `<td>${value}</td>`).join('')}</tr>`).join('');
    };

    populateTable('recentOrdersBody', recentOrders);
    populateTable('topProductsBody', topProducts);
    populateTable('topPagesBody', topPages);
    populateTable('salesRepBody', salesReps);
    populateTable('topCustomersBody', topCustomers);
    populateTable('lowStockBody', lowStock);

    setInterval(() => {
        const charts = [salesChart, userGrowthChart, trafficSourcesChart, conversionRatesChart, monthlySalesChart, salesByCategoryChart, customerAcquisitionChart, customerSatisfactionChart, stockLevelsChart, productTurnoverChart];
        const randomChart = charts[Math.floor(Math.random() * charts.length)];

        if (randomChart) {
            const isPieOrDonut = ['pie', 'donut'].includes(randomChart.config.chart.type);
            randomChart.updateSeries(isPieOrDonut ? randomChart.w.globals.series.map(val => val + Math.floor(Math.random() * 10) - 5) : [{ data: randomChart.w.globals.series[0].data.map(val => val + Math.floor(Math.random() * 10) - 5) }]);
        }
    }, 5000);

    const showNotification = (type, message, duration = 5000) => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        const iconMap = {
            success: '<i class="fas fa-check-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            info: '<i class="fas fa-info-circle"></i>',
            error: '<i class="fas fa-times-circle"></i>'
        };
        notification.innerHTML = `
            <div class="notification-header">
                <span class="notification-title">${iconMap[type]} ${type.charAt(0).toUpperCase() + type.slice(1)}</span>
                <button class="notification-close">&times;</button>
            </div>
            <div class="notification-body">${message}</div>
            <div class="notification-progress"><div class="notification-progress-bar"></div></div>
        `;
        document.getElementById('notificationContainer').appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 10);

        const progressBar = notification.querySelector('.notification-progress-bar');
        let width = 100;
        const interval = setInterval(() => {
            width -= 100 / (duration / 100);
            progressBar.style.width = `${width}%`;
            if (width <= 0) {
                clearInterval(interval);
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 100);

        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearInterval(interval);
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    };
});
