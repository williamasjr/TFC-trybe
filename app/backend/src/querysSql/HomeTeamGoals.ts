export default `
SELECT teams.team_name AS name, 
SUM(CASE WHEN home_team_goals > away_team_goals THEN 3 ELSE 0 END) + 
SUM(CASE WHEN home_team_goals = away_team_goals THEN 1 ELSE 0 END) AS totalPoints,
COUNT(team_name) AS totalGames,
SUM(CASE WHEN home_team_goals > away_team_goals THEN 1 ELSE 0 END) AS totalVictories,
SUM(CASE WHEN home_team_goals = away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
SUM(CASE WHEN home_team_goals < away_team_goals THEN 1 ELSE 0 END) AS totalLosses,
SUM(home_team_goals) AS goalsFavor,
SUM(away_team_goals) AS goalsOwn,
SUM(home_team_goals - away_team_goals) AS goalsBalance,
ROUND(
(SUM(CASE WHEN home_team_goals > away_team_goals THEN 3 ELSE 0 END) + 
SUM(CASE WHEN home_team_goals = away_team_goals THEN 1 ELSE 0 END)) / 
((COUNT(team_name) * 3)) * 100, 2) AS efficiency

FROM TRYBE_FUTEBOL_CLUBE.matches INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS teams 
ON home_team_id = teams.id
WHERE
    matches.in_progress = 0
GROUP BY teams.team_name
ORDER BY totalPoints DESC,
totalVictories DESC,
goalsBalance DESC,
goalsFavor DESC,
goalsOwn DESC;
`;
