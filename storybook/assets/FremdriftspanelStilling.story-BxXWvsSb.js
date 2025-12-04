import{ax as I,U as w,j as t,y as k,S as x,cz as j,cH as b,cG as g,cA as u,Y as y,c$ as _}from"./iframe-ltj2aPP9.js";import{w as m,c as D}from"./ContextDecorators-D6qExaiD.js";import{F as N,A as v}from"./FullførtStilling-3wkuTz6J.js";import{R as T}from"./GjenåpneStillingKnapp-CNJ1wpFS.js";import{T as A}from"./TilgangskontrollForInnhold-CUKt9rdn.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Bl_o9k3N.js";import"./OrganisasjonsnummerAlert-CkVXuvDD.js";import"./VStack-Su87Bwfs.js";import"./BasePrimitive-dde3mTwe.js";import"./List-tyYrlZes.js";import"./Link-zi2EHXXv.js";import"./KandidatHendelseTag-BcGnWwtG.js";import"./Tag-BzUY9-pL.js";import"./ChatExclamationmark-bF_GK_lt.js";import"./FileXMark-CYEnjTew.js";import"./Trash-BEDJZQnM.js";import"./HandShakeHeart-CsIpL-Ei.js";import"./Calendar-DpqY7Kck.js";import"./ThumbUp-P1915iXc.js";import"./Table-DCGlJnPG.js";import"./index-BEB9CuG0.js";import"./index-B40KJ5b4.js";import"./util-LWEoSltv.js";import"./DatoVelger-Clp_sNgj.js";import"./useDatepicker-CF2ZdJAV.js";import"./useControllableState-CWWYUZqw.js";import"./Modal-CFpMKMRr.js";import"./floating-ui.react-CkKTAyWh.js";import"./Date.Input-CTrs6ap6.js";import"./useFormField-FqjO8I_3.js";import"./ChevronDown-Dvjup_Q5.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Cfpp74B7.js";import"./Modal.context-bjbVzsec.js";import"./Popover-aLcq3lA6.js";import"./DismissableLayer-B4bLkyQP.js";import"./startOfMonth-BEfHiTG2.js";import"./Select-C8PbYxY7.js";import"./endOfMonth-boX_OpS2.js";import"./ArrowLeft-g1Jb_8jJ.js";import"./ArrowRight-Bns6LIls.js";import"./isSameDay-ML7RGmNW.js";import"./Checkbox-BDFW98Ey.js";import"./Fieldset-da93ZfUY.js";import"./accordion-BLXvjlnf.js";import"./index-h2-E9cOO.js";import"./index-CgMdzTsx.js";import"./index-Bbgdxjp8.js";import"./Box-BoTh6pzr.js";import"./Bell-BwoGJi8s.js";import"./PersonChat-DAPRnPBk.js";import"./Eye-cuMP6Ed6.js";import"./ProgressBar-D6SDrFiA.js";import"./useLatestRef-StBaR8os.js";import"./EyeSlash-Dmt2l4Vz.js";import"./CircleSlash-rxjbokIl.js";import"./Pencil-DugV01JO.js";import"./FullførStillingModal-B8JzQwqG.js";import"./PersonbrukerTekst-Chj2Hpw9.js";import"./ClockDashed-C61aNKD9.js";import"./IkonNavnAvatar-DTi5ay5Y.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-Co_p5rRa.js";import"./ErrorBoundary-B4bx9ZqS.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Wt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Wt as default};
