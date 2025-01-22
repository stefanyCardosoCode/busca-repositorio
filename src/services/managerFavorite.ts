import { RepoDetails } from "../utils/types";

export const getFavorites = (): RepoDetails[] => {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
};

export const addFavorite = (repo: RepoDetails): void => {
    const favorites = getFavorites();
    if (!favorites.some(fav => fav.id === repo.id)) {
        favorites.push(repo);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
};

export const removeFavorite = (repoId: number): void => {
    let favorites = getFavorites();
    favorites = favorites.filter(repo => repo.id !== repoId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const isFavorite = (repoId: number): boolean => {
    const favorites = getFavorites();
    const favorite = favorites.find(repo => repo.id === repoId);
    return favorite? true : false;
};