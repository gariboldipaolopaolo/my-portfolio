import {act, renderHook} from "@testing-library/react";
import useIsMobile from "./useIsMobile";

describe("useIsMobile", () => {
    const setWindowWidth = (width: number) => {
        Object.defineProperty(window, "innerWidth", {
            configurable: true,
            writable: true,
            value: width,
        });
    };

    beforeEach(() => {
        setWindowWidth(1024);
    });

    it("should return true when screen width is less than the breakpoint", () => {
        setWindowWidth(800);
        const {result} = renderHook(() => useIsMobile(1024));

        expect(result.current).toBe(true);
    });

    it("should return false when screen width is greater than or equal to the breakpoint", () => {
        setWindowWidth(1200);
        const {result} = renderHook(() => useIsMobile(1024));

        expect(result.current).toBe(false);
    });

    it("should update when window resizes", () => {
        const {result} = renderHook(() => useIsMobile(1024));

        expect(result.current).toBe(false); // Default width = 1024

        act(() => {
            setWindowWidth(800);
            window.dispatchEvent(new Event("resize"));
        });

        expect(result.current).toBe(true);

        act(() => {
            setWindowWidth(1100);
            window.dispatchEvent(new Event("resize"));
        });

        expect(result.current).toBe(false);
    });
});