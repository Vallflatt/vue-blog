export const periods = ['Today', 'This Week', 'This Month'] as const;

export type Period = typeof periods[number];

// const getDuration: Record<Period, DurationLike> = {
//   "Today": {day: 1},
//   "This Week": {week: 1},
//   "This Month": {month: 1}
// }
//
// export const filterPostByPeriod = (post: TimelinePost, period: Period): boolean => {
//   return post.created >= DateTime.now().minus(getDuration[period])
// }
