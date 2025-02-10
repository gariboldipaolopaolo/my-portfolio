import {act, renderHook} from "@testing-library/react";
import {useTheme} from "./useTheme";
import {THEME} from "../utils/constants";
import {vi} from "vitest";

vi.mock("gsap", async () => {
    const actual = await vi.importActual<typeof import("gsap")>("gsap");
    return {
        ...actual,
        to: vi.fn(),
    };
});

describe("useTheme hook", () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.setAttribute("data-theme", "");
    });

    test("should initialize with light theme if no theme is stored", () => {
        const {result} = renderHook(() => useTheme());
        expect(result.current.theme).toBe(THEME.LIGHT);
        expect(localStorage.getItem("theme")).toBe(THEME.LIGHT);
    });

    test("should initialize with stored theme", () => {
        localStorage.setItem("theme", THEME.DARK);
        const {result} = renderHook(() => useTheme());
        expect(result.current.theme).toBe(THEME.DARK);
    });

    test("should toggle theme between light and dark", () => {
        const {result} = renderHook(() => useTheme());
        act(() => {
            result.current.toggleTheme();
        });
        expect(result.current.theme).toBe(THEME.DARK);
        expect(localStorage.getItem("theme")).toBe(THEME.DARK);
    });

    test("should update document attribute on theme change", () => {
        const {result} = renderHook(() => useTheme());
        act(() => {
            result.current.toggleTheme();
        });
        expect(document.documentElement.getAttribute("data-theme")).toBe(THEME.DARK);
    });

    test("should not change theme if localStorage is manually modified", () => {
        localStorage.setItem("theme", THEME.LIGHT);
        const {result} = renderHook(() => useTheme());
        localStorage.setItem("theme", THEME.DARK);
        expect(result.current.theme).toBe(THEME.LIGHT);
    });
});
