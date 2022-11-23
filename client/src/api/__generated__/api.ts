/**
 * CojamCMS
 * 0.1.0
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "oazapfts/lib/runtime";
import * as QS from "oazapfts/lib/runtime/query";
export const defaults: Oazapfts.RequestOpts = {
    baseUrl: "/",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {};
export type Link = {
    title: string;
    url: string;
    id: number;
};
export type Game = {
    title: string;
    release_date: string;
    platform: string;
    description?: string;
    id: number;
    slug: string;
    links: Link[];
    image_url?: string;
};
export type LinkCreate = {
    title: string;
    url: string;
};
export type GameUpdate = {
    title: string;
    release_date: string;
    platform: string;
    description?: string;
    links?: LinkCreate[];
};
export type ValidationError = {
    loc: (string | number)[];
    msg: string;
    "type": string;
};
export type HttpValidationError = {
    detail?: ValidationError[];
};
export type GameCreate = {
    title: string;
    release_date: string;
    platform: string;
    description?: string;
    slug: string;
    links: LinkCreate[];
};
export type UserCreate = {
    email: string;
    username: string;
    password: string;
};
export type Token = {
    access_token: string;
    token_type?: string;
    expires: string;
};
export type BodySignInAuthSignInPost = {
    grant_type?: string;
    username: string;
    password: string;
    scope?: string;
    client_id?: string;
    client_secret?: string;
};
export type User = {
    email: string;
    username: string;
    id: number;
};
export type BodyAddImageToGameFilesGameImagePost = {
    image: Blob;
};
export type BodyAddImageToAlbumFilesMusicImagePost = {
    image: Blob;
};
export type Artist = {
    nickname: string;
    id: number;
    link?: string;
};
export type Track = {
    title: string;
    description?: string;
    id: number;
    album_id: number;
    artists: Artist[];
    featured: Artist[];
};
export type Album = {
    title: string;
    description?: string;
    release_date: string;
    id: number;
    slug: string;
    tracks: Track[];
    artists: Artist[];
    featured?: Artist[];
    links: Link[];
    image_url?: string;
};
export type ArtistCreate = {
    nickname: string;
};
export type TrackCreate = {
    title: string;
    description?: string;
    featured?: ArtistCreate[];
};
export type AlbumUpdate = {
    title: string;
    description?: string;
    release_date: string;
    tracks?: TrackCreate[];
    artists?: ArtistCreate[];
    links?: LinkCreate[];
};
export type AlbumCreate = {
    title: string;
    description?: string;
    release_date: string;
    slug: string;
    tracks: TrackCreate[];
    artists: ArtistCreate[];
    links: LinkCreate[];
};
/**
 * Get Games
 */
export function getGamesGamesGet(opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Game[];
    }>("/games/", {
        ...opts
    });
}
/**
 * Update Game
 */
export function updateGameGamesPut(slug: string, gameUpdate: GameUpdate, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Game;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/games/${QS.query(QS.explode({
        slug
    }))}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: gameUpdate
    }));
}
/**
 * Add Game
 */
export function addGameGamesPost(gameCreate: GameCreate, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Game;
    } | {
        status: 422;
        data: HttpValidationError;
    }>("/games/", oazapfts.json({
        ...opts,
        method: "POST",
        body: gameCreate
    }));
}
/**
 * Delete Game
 */
export function deleteGameGamesDelete(slug: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/games/${QS.query(QS.explode({
        slug
    }))}`, {
        ...opts,
        method: "DELETE"
    });
}
/**
 * Get Game
 */
export function getGameGamesSlugGet(slug: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Game;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/games/${encodeURIComponent(slug)}`, {
        ...opts
    });
}
/**
 * Sing Up
 */
export function singUpAuthSignUpPost(userCreate: UserCreate, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Token;
    } | {
        status: 422;
        data: HttpValidationError;
    }>("/auth/sign-up", oazapfts.json({
        ...opts,
        method: "POST",
        body: userCreate
    }));
}
/**
 * Sign In
 */
export function signInAuthSignInPost(bodySignInAuthSignInPost: BodySignInAuthSignInPost, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Token;
    } | {
        status: 422;
        data: HttpValidationError;
    }>("/auth/sign-in", oazapfts.form({
        ...opts,
        method: "POST",
        body: bodySignInAuthSignInPost
    }));
}
/**
 * Get User
 */
export function getUserAuthUserGet(opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: User;
    }>("/auth/user", {
        ...opts
    });
}
/**
 * Add Image To Game
 */
export function addImageToGameFilesGameImagePost(gameSlug: string, bodyAddImageToGameFilesGameImagePost: BodyAddImageToGameFilesGameImagePost, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: string;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/files/game/image${QS.query(QS.explode({
        game_slug: gameSlug
    }))}`, oazapfts.multipart({
        ...opts,
        method: "POST",
        body: bodyAddImageToGameFilesGameImagePost
    }));
}
/**
 * Add Image To Album
 */
export function addImageToAlbumFilesMusicImagePost(albumSlug: string, bodyAddImageToAlbumFilesMusicImagePost: BodyAddImageToAlbumFilesMusicImagePost, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: string;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/files/music/image${QS.query(QS.explode({
        album_slug: albumSlug
    }))}`, oazapfts.multipart({
        ...opts,
        method: "POST",
        body: bodyAddImageToAlbumFilesMusicImagePost
    }));
}
/**
 * Get Albums
 */
export function getAlbumsMusicGet(opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Album[];
    }>("/music/", {
        ...opts
    });
}
/**
 * Update Album
 */
export function updateAlbumMusicPut(slug: string, albumUpdate: AlbumUpdate, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Album;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/music/${QS.query(QS.explode({
        slug
    }))}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: albumUpdate
    }));
}
/**
 * Add Album
 */
export function addAlbumMusicPost(albumCreate: AlbumCreate, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Album;
    } | {
        status: 422;
        data: HttpValidationError;
    }>("/music/", oazapfts.json({
        ...opts,
        method: "POST",
        body: albumCreate
    }));
}
/**
 * Delete Album
 */
export function deleteAlbumMusicDelete(slug: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/music/${QS.query(QS.explode({
        slug
    }))}`, {
        ...opts,
        method: "DELETE"
    });
}
/**
 * Get Album
 */
export function getAlbumMusicSlugGet(slug: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Album;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/music/${encodeURIComponent(slug)}`, {
        ...opts
    });
}
