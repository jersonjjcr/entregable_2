import request from 'supertest';
import app from '../src/app';

describe('GET /api/posts', () => {
    it('should return status 403 if not authorized', async () => {
        const res = await request(app).get('/api/posts');
        expect(res.statusCode).toBe(403);
    });
});