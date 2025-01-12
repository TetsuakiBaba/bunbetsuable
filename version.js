var version_date = `
Last modified: 2025/01/12 17:17:27
`;
version_date = version_date.trim('\n');
// version_dateの戦闘に Last modified: 2025/01/12 17:17:27
version_date = version_date.replace('Last modified: ', '');

// loadを待つ
document.getElementById('version').innerHTML = version_date;
