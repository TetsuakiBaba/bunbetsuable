var version_date = `
Last modified: 2024/02/21 10:29:11
`;
version_date = version_date.trim('\n');
// version_dateの戦闘に Last modified: 2024/02/21 10:29:11
version_date = version_date.replace('Last modified: ', '');

// loadを待つ
document.getElementById('version').innerHTML = version_date;
