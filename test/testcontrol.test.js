const chai = require('chai');
const chaiHttp = require('chai-http');
const Task = require('../models/task');
const app = require('../app');  
const { status } = require('express/lib/response');


chai.use(chaiHttp);
const expect = chai.expect;

 
async function createSampleTask() {
  return await Task.create({ task_title: 'Sample Task' });
}

describe('TODO Controller', () => {
   
  beforeEach(async () => {
    await Task.deleteMany({});
  });
 
  describe('POST /create', () => {
    it('should create a new task', async () => {
      const res = await chai.request(app)
        .post('/create')
        .send({ task_title: 'New Task', status:false });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.task).to.have.property('_id');
      expect(res.body.task).to.have.property('task_title', 'New Task');
    });

    it('should return error if task_title is missing', async () => {
      const res = await chai.request(app)
        .post('/create')
        .send({});

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error', "can't create task");
    });
  });

  
  describe('GET /task/:taskid', () => {
    it('should get a task by id', async () => {
      const task = await createSampleTask();

      const res = await chai.request(app)
        .get(`/task/${task._id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('task_title', 'Sample Task');
    });

    it('should return error if task with given id does not exist', async () => {
      const res = await chai.request(app)
        .get('/task/invalid-id');

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error', 'task do not save in db');
    });
  });

  
  describe('GET /tasks', () => {
    it('should get all tasks', async () => {
      await createSampleTask();

      const res = await chai.request(app)
        .get('/tasks');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(1);
      expect(res.body[0]).to.have.property('task_title', 'Sample Task');
    });
  });

   
  describe('DELETE /taskDelete/:taskid', () => {
    it('should delete a task by id', async () => {
      const task = await createSampleTask();

      const res = await chai.request(app)
        .delete(`/taskDelete/${task._id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Task deleted successfully');

      const deletedTask = await Task.findById(task._id);
      expect(deletedTask).to.be.null;
    });

    it('should return error if task with given id does not exist', async () => {
      const res = await chai.request(app)
        .delete('/taskDelete/invalid-id');

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error', 'Task not deleted');
    });
  });

   
  describe('PUT /update/:taskid', () => {
    it('should update a task status by id', async () => {
      const task = await createSampleTask();
      const res = await chai.request(app);
    })
})

})
