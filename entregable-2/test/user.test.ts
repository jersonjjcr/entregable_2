import request from 'supertest';
import app from '../src/app';

describe('GET /api/users', () => {
    it('should return status 200', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(200);
    });
});
