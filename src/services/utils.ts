export const dayInterval = (created: string) => {
    const creationDate = new Date(created);
    const nowDate = new Date();
    const differenceInTime = nowDate.getTime() - creationDate.getTime();
    const dayInMiliseconds = 1000 * 60 * 60 * 24;
    const differenceInDays = Math.ceil(differenceInTime / dayInMiliseconds);
    return differenceInDays > 1
       ? differenceInDays + ' days ago'
       : differenceInDays === 1
       ? ' day ago'
       : 'today';
 };