// export function Task({id, name, deadline, isDone, note, steps}) {
//     return Object.assign(this, {id, name, deadline, isDone, note, steps});
// }

export class Task {
  constructor({ id, name, deadline, isDone, note, steps, isDeleted}) {
    this.id = id;
    this.name = name;
    this.deadline = deadline;
    this.isDone = isDone;
    this.note = note;
    this.steps = steps;
    this.isDeleted = isDeleted;
    this.update();
  }

  toggleDeleted() {
    this.isDeleted = !this.isDeleted;
  }

  update() {
    const now = new Date();
      if (this.deadline) {
        const deadlineTime = new Date(this.deadline).getTime();
        this.countDaysLeft = (deadlineTime - now) / (1000 * 3600 * 24);
        return;
      } 

      // không có deadline

      this.countDaysLeft = 99999;
  }
}

export function TaskStep({ id, name, isDone }) {
  return Object.assign(this, { id, name, isDone });
}
