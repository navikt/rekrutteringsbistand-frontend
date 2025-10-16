import{ac as I,ad as w,j as t,R as k,S as x,ch as j,cl as b,aG as g,ci as u,aP as y,cx as _}from"./iframe-G1hfx8xa.js";import{w as d,c as D}from"./ContextDecorators-DFnaNYxM.js";import{F as N,A as v}from"./FullførtStilling-CyoRI8RS.js";import{R as T}from"./GjenåpneStillingKnapp-BtRfEbiI.js";import{T as A}from"./TilgangskontrollForInnhold-B8AyKz9q.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-D__NbBKb.js";import"./OrganisasjonsnummerAlert-C3xwG-Jj.js";import"./VStack-c0izGSP4.js";import"./BasePrimitive-CY3tMvtH.js";import"./List-Be4Ie-2l.js";import"./Link-5wsMpGh6.js";import"./KandidatHendelseTag-BR9iMMk8.js";import"./Tag-BSc7GXWR.js";import"./ChatExclamationmark-DxJK5iOy.js";import"./FileXMark-CvM1dNJH.js";import"./Trash-C-SHTNSF.js";import"./HandShakeHeart-DXSKadqG.js";import"./Calendar-CVja620b.js";import"./ThumbUp-BiHwjLyU.js";import"./Table-CUs4zp_K.js";import"./util-Bpfxgop4.js";import"./format-DH5YYcU8.js";import"./match-YPGwa1O1.js";import"./parseISO-KVJ6dj2E.js";import"./parse-COvvf3og.js";import"./getDefaultOptions-Cf2a4PTP.js";import"./util-CR4YimVW.js";import"./accordion-CFAHgQqg.js";import"./index-hMrouriZ.js";import"./index-jQ0Pl1Z_.js";import"./index-Bf9_Mp85.js";import"./ChevronDown-C5xk8A4j.js";import"./Box-DOFtEfk4.js";import"./Bell-pM3u2Dtt.js";import"./PersonChat-B5r8UdnN.js";import"./Eye-BsmvyHxN.js";import"./ProgressBar-DF5nrjn0.js";import"./EyeSlash-DQYI14CT.js";import"./CircleSlash-BDZUx65H.js";import"./Modal-zdqqxkwf.js";import"./floating-ui.react-CbBWK-4r.js";import"./Date.Input-DDMiDXkr.js";import"./useFormField-x-CGa-s7.js";import"./useControllableState-BWTLl1yr.js";import"./Modal.context-Caws_Tsd.js";import"./Checkbox-51nx1tN5.js";import"./Fieldset-Fo9YEOiE.js";import"./Pencil-C9-gHaRB.js";import"./PersonbrukerTekst-VPGXSZin.js";import"./ClockDashed-CbBYFM_e.js";import"./Tasklist-BK2jsXPy.js";import"./ErrorBoundary-Vwt0fLc_.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[m],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
