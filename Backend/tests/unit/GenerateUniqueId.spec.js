const GenerateUniqueId = require('../../src/utils/GenerateUniqueId')

describe('Generate Unique Id', ()=> {
    it('should generate unique ID', ()=> {
        const id = GenerateUniqueId();
        expect(id).toHaveLength(8);
    });
});