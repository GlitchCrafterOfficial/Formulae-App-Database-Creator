import Database from "@tauri-apps/plugin-sql";

const db = await Database.load('sqlite://../formulae.sqlite')
/* Crud Materia
Nombre de la tabla: Matter
*/

export async function createMatter(matter) {
    return await db.execute(`
        INSERT INTO Matter (name)
        VALUES ($1)
    `, [matter])
}

export async function listMatter() {
    return await db.select("SELECT * FROM Matter")
}

export async function editMatter(oldMatterName, newMatterName) {
    return await db.execute(`
        UPDATE Matter
        SET name = $1
        WHERE name = $2
    `, [newMatterName, oldMatterName])
}

export async function deleteMatter(matterName) {
    return await db.execute(`
        DELETE FROM Matter
        WHERE name = $1
    `, [matterName])
}

export async function selectOneMatter(matterId) {
    return await db.select(`
        SELECT * FROM Matter
        WHERE id = $1
    `, [matterId])
}