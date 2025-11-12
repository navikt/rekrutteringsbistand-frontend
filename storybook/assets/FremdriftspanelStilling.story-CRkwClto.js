import{aE as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-gH94vgHb.js";import{w as m,c as A}from"./ContextDecorators-D_K9I8aX.js";import{F as N,A as v}from"./FullførtStilling-Ca71DYvn.js";import{R as T}from"./GjenåpneStillingKnapp-CHPqdb3d.js";import{T as E}from"./TilgangskontrollForInnhold-BzyZuQ7O.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D8KLeJ3I.js";import"./OrganisasjonsnummerAlert-MH_cCrA5.js";import"./VStack-C_0uRaza.js";import"./BasePrimitive-Dtl2AadN.js";import"./List-BtqrrQcv.js";import"./Link-p2HB9IqL.js";import"./KandidatHendelseTag-BCqxey7V.js";import"./Tag-CDQnKGRM.js";import"./ChatExclamationmark-DGwLxcg6.js";import"./FileXMark-Ci6usYat.js";import"./Trash-qgo9htqB.js";import"./HandShakeHeart-D3Rlz-cl.js";import"./Calendar-Bnmy4T63.js";import"./ThumbUp-BTvWXjct.js";import"./Table-BG9kKsFy.js";import"./util-B7KpV28B.js";import"./parse-CdFgNFjr.js";import"./getDefaultOptions-CGpM4vju.js";import"./parseISO-Mr5NIIp7.js";import"./index-CDjreHOH.js";import"./index-B40KJ5b4.js";import"./isBefore-FTsTdB_z.js";import"./util-gQjNrG7y.js";import"./accordion-B7YdFRSX.js";import"./index-BYWFcZbR.js";import"./index-Bv-Dv4yO.js";import"./index-CXJVyEG_.js";import"./ChevronDown-7VBKiPJA.js";import"./Box-DGx7nSoq.js";import"./Bell-D-YEK3_3.js";import"./PersonChat-DjwNDuvB.js";import"./Eye-CmAHnjft.js";import"./ProgressBar-BVVlFe6h.js";import"./EyeSlash-BhExekDg.js";import"./CircleSlash-BZR0MXKh.js";import"./Modal-C4g0aqfs.js";import"./floating-ui.react-lzNEJOuU.js";import"./Date.Input-B_gIJoTa.js";import"./useFormField-D561gDES.js";import"./useControllableState-Cinq0aNa.js";import"./Modal.context-DTyg-fOh.js";import"./Checkbox-BnAnKsuH.js";import"./Fieldset-2fwicYOK.js";import"./Pencil-D82o1gow.js";import"./PersonbrukerTekst-D9XsNeIw.js";import"./ClockDashed-BEA4pGlw.js";import"./Tasklist-DRUpJSJf.js";import"./ErrorBoundary-x83h77Jd.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
