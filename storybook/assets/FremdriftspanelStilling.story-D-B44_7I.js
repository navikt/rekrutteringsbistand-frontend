import{aw as w,U as I,j as t,y as k,S as j,cz as x,cH as b,cG as g,cA as u,Y as y,c$ as _}from"./iframe-jqaI6nix.js";import{w as m,c as D}from"./ContextDecorators-Dwh4bwJL.js";import{F as N,A as v}from"./FullførtStilling-DbZKICpf.js";import{R as T}from"./GjenåpneStillingKnapp-BBIU2TTG.js";import{T as A}from"./TilgangskontrollForInnhold-KoZcT_qm.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C649bL-T.js";import"./OrganisasjonsnummerAlert-JWpvu6Qz.js";import"./VStack-DkixGE9B.js";import"./BasePrimitive-CuHGsCuA.js";import"./List-sTPOW_96.js";import"./Link-B0wBbhpE.js";import"./KandidatHendelseTag-Dth3ETUV.js";import"./Tag-Dxz2F1X3.js";import"./ChatExclamationmark-5qgcDlon.js";import"./FileXMark-D6NBLjbP.js";import"./Trash-CjU-_2dx.js";import"./HandShakeHeart-4SmutWG-.js";import"./Calendar-Duf0ayvC.js";import"./ThumbUp-Vbg7evja.js";import"./Table-CuOaNzwY.js";import"./index-D54ImCzq.js";import"./index-B40KJ5b4.js";import"./util-CNc4M1gg.js";import"./DatoVelger-D9CJodHp.js";import"./useDatepicker-DTZpfghL.js";import"./useControllableState-CB7qy0JV.js";import"./Modal-B-RDzvQt.js";import"./floating-ui.react-B79GNVCi.js";import"./Date.Input-Dx7G7IQt.js";import"./useFormField-C6_IMCya.js";import"./ChevronDown-Cjik6YhF.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-D3StlOby.js";import"./Modal.context-DOBq2N_q.js";import"./Popover-DMfmbIVZ.js";import"./DismissableLayer-C4GOVWmh.js";import"./startOfMonth-DtAoUrY7.js";import"./Select-DCHNHU2b.js";import"./endOfMonth-D8s5rDqR.js";import"./ArrowLeft-Dtq57SbM.js";import"./ArrowRight-CfdKcSBP.js";import"./isSameDay-olhEW1Xv.js";import"./Checkbox-BbBByMyr.js";import"./Fieldset-BONOHTLw.js";import"./accordion-0BUEEX7c.js";import"./index-DYEx_LgQ.js";import"./index-CCeFUl-D.js";import"./index-BTzhBUly.js";import"./Box-DTkmOu9l.js";import"./Bell-BdBMeN3m.js";import"./PersonChat-Dctw5Pt2.js";import"./Eye-BquEyTOd.js";import"./ProgressBar-DARWIc7A.js";import"./useLatestRef-yLZ39Zv7.js";import"./EyeSlash-DO8UIost.js";import"./CircleSlash-BxDe9DmA.js";import"./Pencil-JYBFhKes.js";import"./FullførStillingModal-B4RQQqJE.js";import"./PersonbrukerTekst-DBcmWy9X.js";import"./ClockDashed-BmDqRAxV.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-Cl_vBCEr.js";import"./ErrorBoundary-DVAdGVoJ.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const zt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,zt as default};
