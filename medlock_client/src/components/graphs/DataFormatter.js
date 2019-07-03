export function getLinesFromPDISurveys(surveys) {
    var data = [];
    surveys.forEach(survey => {
        const date = new Date(survey.date);
        survey.responses.forEach(response => {
            const { question, answer } = response;
            const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const formattedAnswer = Number(answer);
            data.push({date: formattedDate, question, answer: formattedAnswer});
        });
    });
    
    var lines = [];
    for(var i = 0; i < 7; i += 1) {
        lines.push(data.filter(response => response.question === data[i].question));
    }
    return lines;
}