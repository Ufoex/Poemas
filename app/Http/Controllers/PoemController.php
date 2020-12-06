<?php

namespace App\Http\Controllers;

use App\Poem;
use Illuminate\Http\Request;

class PoemController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index(Request $request)
    {
        if ($request->ajax())
            return Poem::all()->jsonSerialize();
        return view('poem.index');
    }

    public function create()
    {
        return view('poem.create');
    }

    public function store(Request $request)
    {
        Poem::create([
           'poem'=>$request->poem,
           'autor'=>$request->autor
        ]);
    }

    public function show($id)
    {
        //
    }

    public function edit(Request $request, $id)
    {
        if ($request->ajax())
            return Poem::find($id);
        return view('poem.edit');
    }

    public function update(Request $request, $id)
    {
        Poem::find($id)->update([
            'poem'=>$request->poem,
            'autor'=>$request->autor
        ]);
    }

    public function destroy($id)
    {
        Poem::find($id)->delete();
    }
}
